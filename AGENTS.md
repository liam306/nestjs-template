# Backend Project Rules

- Always use `pnpm` for package management and running scripts (e.g., `pnpm install`, `pnpm run build`).
- Adhere to the established NestJS module structure.
- Maintain consistent error handling and response formats.
- All code comments and documentation must be in English.
- Avoid using `any` type; always define explicit types or interfaces.
- Use i18n for all error messages and responses.
- Always use pagination for list endpoints (especially for relations that can grow large).
