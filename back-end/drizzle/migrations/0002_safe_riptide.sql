CREATE TABLE `usuarios` (
	`id` text NOT NULL,
	`name` text NOT NULL,
	`mail` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `usuarios_id_unique` ON `usuarios` (`id`);