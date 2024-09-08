CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(36) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `password_hash` VARCHAR(60) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO `users` (`id`, `email`, `password_hash`)
VALUES (
  '1',
  'test@user.com',
  'test'
);

CREATE TABLE IF NOT EXISTS `studies` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(36) NOT NULL,
  `topic` VARCHAR(36) NOT NULL,
  `progress` FLOAT(11),
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user`)
      REFERENCES `users`(`id`)
      ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO `studies` (`user`, `topic`, `progress`)
VALUES (
  (SELECT `id` FROM `users` WHERE `email` = 'test@user.com'),
  'next.js',
  '0.5'
);