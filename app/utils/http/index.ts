export const ResponseJSON = (data: any, code: number, msg: string) => {
  return {
    meta: {
      code: 200,
      message: data ? msg : 'Data is empty!'
    },
    data: data ? data : [],
  }
}

export const fetchData = async (url: string) => {
  const res = await fetch(url);
  return res.json();
}