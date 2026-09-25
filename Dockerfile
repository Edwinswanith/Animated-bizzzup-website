FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

FROM base AS builder
WORKDIR /app
ARG GOOGLE_SITE_VERIFICATION
ARG BING_SITE_VERIFICATION
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
ENV GOOGLE_SITE_VERIFICATION=$GOOGLE_SITE_VERIFICATION
ENV BING_SITE_VERIFICATION=$BING_SITE_VERIFICATION
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
