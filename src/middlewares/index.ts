import router from "@/router";
import { authMiddleware } from "./auth";

router.beforeEach(authMiddleware);
