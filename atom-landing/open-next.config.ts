import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Minimal config: no R2/KV incremental-cache override, so the deploy needs no
// extra bindings. Add an `incrementalCache` override here later if you enable
// ISR/on-demand revalidation at scale.
export default defineCloudflareConfig({});
