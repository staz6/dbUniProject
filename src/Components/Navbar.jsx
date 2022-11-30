import React, { useContext, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import SupabaseContext from "./SupabaseContext";
import Paper from '@mui/material/Paper';
import './navbar.css'
import { useEffect } from "react";
import CollapsibleTable from "./CollapseTable";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgb(0, 124, 93)',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const CustomPaper = styled(Paper)(({theme})=>({
  maxWidth:"1200px"
}))
export default function Navbar(){
  const {cart,supabase,setCart} = useContext(SupabaseContext);
  const [open,setOpen]=useState(false)
  const [orderDialog,setOrderDialog]=useState(false)
  const [line,setLine]=useState({})
  const [order,setOrder]=useState([])

  const handleClose = ()=>setOpen(false)
  const getAllOrder = async ()=>{
    let user = JSON.parse(localStorage.getItem('User'))
    let { data: Orders, error } = await supabase
    .from('Orders')
    .select(`*,OrderItems (
      id,Total,Quantity, Products(
        Title
      )
    )`)
    .eq('User', user.user.id)
    setOrder([...Orders])
  }
  useEffect(()=>{
    getAllOrder()
  },[])

  useEffect(()=>{
    const obj ={}
    cart.forEach((value)=>{
      if(obj[value.id]){
        obj[value.id].count= obj[value.id].count +1
      }
      else{
        obj[value.id]=value
        obj[value.id].count=1
      }
    })
    setLine(obj)
  },[cart])
  const handleBuy = async () =>{
    let total=0;
    Object.keys(line).map((row)=>{
      total = total + (line[row].count * line[row].Price)
    })
    let user = JSON.parse(localStorage.getItem('User'))
    const { data, error } = await supabase
    .from('Orders')
    .insert([
      { Total: total, User: user.user.id },
    ],{ upsert: true }).select()
    if(error) {alert(error); return}
    console.log(data)
    Object.keys(line).map(async (row)=>{
      const { error } = await supabase
      .from('OrderItems')
      .insert([
        { Quantity: line[row].count, Total: line[row].count * line[row].Price,Product:line[row].id,Order:data[0].id },
      ])
    })
    if(error) alert(error)
    else{
      alert("Order Created successfully")
      setCart([])
      setLine({})
      setOpen(false)
    }
  }
    return(
        <React.Fragment>
             <div class="alert alert-info top-alert" role="alert">
      Free shipping on orders above $100!
      <span class="close-al">&times;</span>
    </div>
       <nav class="a x navbar navbar-expand-lg" id="a_new">
        <a class="navbar-brand" href="Index.html">
          <img src="https://afuccuoqxgbkvwidhulu.supabase.co/storage/v1/object/public/images/logo1.png" class="logo" id="brand_logo"/>
        </a>
        <button class="navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="coll collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item ">
              <a class="n nav-link " href="Index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="n nav-link" href="Products.html">Plants</a>
            </li>
            <li class="nav-item">
              <a class="n nav-link" href="Support.html">Support</a>
            </li>
            <li class="nav-item">
              <a class="n nav-link" href="Blog.html">Blog</a>
            </li>
            
          </ul>

        

      
          <ul class="cart-cont navbar-nav navbar-right n2">
             <i class="fas fa-user bag" onClick={()=>{setOrderDialog(true)}} style={{color:"white",fontSize:"1.6em",cursor:"pointer"}}></i>
           </ul>
          <ul class="cart-cont navbar-nav navbar-right n2">
             <i class="fas fa-shopping-cart bag" onClick={()=>{setOpen(true)}} style={{color:"white",fontSize:"1.6em",cursor:"pointer"}}></i>
             <b class="count" id="count"  style={cart.length>0 ? {display:"inline-block"}: null}>{cart.length}</b>
           </ul>
           
        </div>
      </nav>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth>
        <DialogTitle>Cart</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TableContainer component={CustomPaper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Title</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Total</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              Object.keys(line).map((row)=>{
                return(
                  <StyledTableRow key={line[row].Title}>
                  <StyledTableCell component="th" scope="line[row]">
                    {line[row].Title}
                  </StyledTableCell>
                  <StyledTableCell align="right">{line[row].Price}</StyledTableCell>
                  <StyledTableCell align="right">{line[row].count}</StyledTableCell>
                  <StyledTableCell align="right">{line[row].count * line[row].Price}</StyledTableCell>
                </StyledTableRow>
                )
              })
            }
           
          </TableBody>
        </Table>
      </TableContainer>
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleBuy}>Buy</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={orderDialog} onClose={handleClose} fullWidth maxWidth>
        <DialogTitle>Orders</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <CollapsibleTable rows={order}/>
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOrderDialog(false)}}>Close</Button>
        </DialogActions>
      </Dialog>
        </React.Fragment>
    )
}