import { createClient } from '@supabase/supabase-js';
import React from 'react'


const SupabaseContext = React.createContext({});
export const SupabaseContextProvider = SupabaseContext.Provider
export default SupabaseContext