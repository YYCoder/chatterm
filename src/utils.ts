export const sleep = (timeout = 1000) =>
    new Promise((resolve) => setTimeout(resolve, timeout));

export const logJson = (arg: any) => console.log(JSON.stringify(arg, null, 4));
