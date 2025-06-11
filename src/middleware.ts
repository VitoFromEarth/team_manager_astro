import { sequence } from "astro:middleware";
import type { MiddlewareHandler } from "astro";

async function checkAuth(context: Parameters<MiddlewareHandler>[0], next: Parameters<MiddlewareHandler>[1]) {
	const publicRoutes = ["/signin", "/register", "/api/auth/signin", "/api/auth/callback"];
	const accessToken = context.cookies.get("sb-access-token");
	const refreshToken = context.cookies.get("sb-refresh-token");

	if (publicRoutes.includes(context.url.pathname)) {
		return next();
	}

	if (!accessToken || !refreshToken) {
		return context.redirect("/signin");
	}

	return next();
}

export const onRequest = sequence(checkAuth);