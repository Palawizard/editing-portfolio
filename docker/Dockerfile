FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG PUBLIC_FORMSPREE_FORM_ID
ARG PUBLIC_TURNSTILE_SITE_KEY
ARG PUBLIC_CONTACT_EMAIL
ARG BASE_PATH=""

ENV PUBLIC_FORMSPREE_FORM_ID=$PUBLIC_FORMSPREE_FORM_ID
ENV PUBLIC_TURNSTILE_SITE_KEY=$PUBLIC_TURNSTILE_SITE_KEY
ENV PUBLIC_CONTACT_EMAIL=$PUBLIC_CONTACT_EMAIL
ENV BASE_PATH=$BASE_PATH

# Production videos are mounted at runtime and are intentionally excluded from
# the build context. Run Vite directly so the local prebuild media check does
# not require the runtime media volume inside the builder.
RUN pnpm exec vite build

FROM nginx:1.29-alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
	CMD wget -qO- http://127.0.0.1:8080/healthz >/dev/null || exit 1
