export const handleErrorAsync =
  (func: any) => async (req: any, res: any, next: (arg0: unknown) => void) => {
    try {
      await func(req, res, next);
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
      next(error);
    }
  };
