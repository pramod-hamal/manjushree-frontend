export const getHeader =()=>{
 if(typeof window !== "undefined" && typeof window !== undefined){
   const token :string|null = localStorage.getItem("token");
  return {Authorization : "Bearer "+ token}
 }
}