import router from "@/router";
import { authMiddleware } from "./auth";
import { redirector } from "./redirector";

router.beforeEach(authMiddleware);
router.beforeEach(redirector);
