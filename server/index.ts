import { app } from "./app.js";
import { PORT } from "@/env";

app.listen(PORT, () => {
  console.log(`flowledge server running on port: ${PORT}`);
});
