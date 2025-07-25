import app from "./app";
import { PORT } from "@/env";

app.listen(PORT, () => {
  console.log(`flowledge server running on port: ${PORT}`);
});
