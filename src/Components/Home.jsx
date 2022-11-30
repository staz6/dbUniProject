import React, { useContext, useEffect, useState } from "react";

import SupabaseContext from "./SupabaseContext";

export default function Home() {
  const {supabase,setCart,cart} = useContext(SupabaseContext);
  if (!supabase) {
    return;
  }
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    let { data: Products, error } = await supabase.from("Products").select("*");
    setProducts([...Products]);
  };
  const addToCart = (product)=>{
   setCart([...cart,product])
  }
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <React.Fragment>
      <p class="top-p1" id="top-p1">
        Sale.
      </p>
      <p class="top-p2" id="top-p2">
        Upto 50% off on Men, Women and Kids clothing items
      </p>
      <p class="top-p3" id="top-p3">
        Sign up to avail exlusive discounts!
      </p>
      <button class="btn btn-dark top-b1" id="top-b1" tonclick="sale_func()">
        Explore
      </button>
      <img
        src="https://afuccuoqxgbkvwidhulu.supabase.co/storage/v1/object/public/images/coverc.png?t=2022-11-30T09%3A32%3A07.971Z"
        class="top-cover"
        id="top-cover"
      />

      <div align="center">
        <div class="container-fluid pl-5 pr-5 featured mt-4">
          <h1 align="center">
            <b>Featured Collection</b>
          </h1>

          <div class="row mt-5 pl-5 pr-5">
            {products.map((val, index) => {
              return (
                <div class="col-sm-4 col-lg-4 col-md-4 col-12 mb-4 pl-1 pr-1 pt-3 pb-2">
                  <div class="container">
                    <img src={val.Image} class="img-fluid" alt="img1" />
                    <div align="center" class="mt-2">
                      <h4>{val.Title}</h4>
                      <p>
                        Price: <span id="curr_id4">$</span>&nbsp;
                        <span id="price_id4">{val.Price}</span>
                        <br />
                      </p>
                        <button class="btn" type="button" onClick={(e)=>{addToCart(val)}}>
                          Add to Cart
                        </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      
    </React.Fragment>
  );
}
