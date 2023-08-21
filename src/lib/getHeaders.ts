export const getHeader =()=>{
 if(typeof window !== "undefined" && typeof window !== undefined){
   const token :string|null = localStorage.getItem("token");
  return {Authorization : "Bearer "+ token}
 }
}

export const prepareHeader=(headers:Headers) => {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", "Bearer " + token);
    }
    return;
  }