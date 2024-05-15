import { TRegister } from "@schemas/authSchemas";
import axios from "axios";

export const submitRegister = async (data: TRegister) => {
  const res = await axios.post('/api/register', data)
  
  console.log(res);
}