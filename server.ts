import { secrets } from "./app";
import { app } from "./app";

if (secrets.NODE_ENV !== "test") {
  app.listen(secrets.PORT || 5000);
}
