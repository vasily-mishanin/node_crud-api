export const loggerMiddleware = (req: Request, res: Response) => {
  console.log(`${req.method} ${req.url}`);
};
