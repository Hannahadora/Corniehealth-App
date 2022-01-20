import router from "@/router";
import { authMiddleware } from "./auth";
import { redirector } from "./redirector";
import { remeberSettings } from "./remember-settings";

router.beforeEach(authMiddleware);
router.beforeEach(redirector);

router.afterEach(remeberSettings);
