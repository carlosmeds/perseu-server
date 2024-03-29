export const handleErrorAsync =
  (func: any) => async (req: any, res: any, next: (arg0: unknown) => void) => {
    try {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      const result = await func(req, res, next);

      res.status(result.statusCode).json(result.body);
    } catch (error) {
      res.status(500).json({
        message: "Erro interno do servidor",
      });
      next(error);
    }
  };
