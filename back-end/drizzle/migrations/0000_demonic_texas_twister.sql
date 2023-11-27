CREATE TABLE `products` (
	`id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`active` integer DEFAULT 0 NOT NULL,
	`name` text NOT NULL,
	'image'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_id_unique` ON `products` (`id`);