import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatPrice(
	price: number | string,
	options: {
		currency?: "USD" | "EUR" | "GRP" | "BDT";
		notation?: Intl.NumberFormatOptions["notation"];
	} = {},
) {
	const { currency = "USD", notation = "compact" } = options;

	const numericPrice = typeof price === "string" ? parseFloat(price) : price;

	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
		notation,
		maximumFractionDigits: 2,
	}).format(numericPrice);
}

export function constructMetadata({
	title = "DigitalTradeHub - the marketplace for digital assets",
	description = "DigitalTradeHub is an open-source marketplace for high-quality digital goods.",
	image = "/meta-logo.svg",
	icons = "/logo.svg",
	noIndex = false,
}: {
	title?: string;
	description?: string;
	image?: string;
	icons?: string;
	noIndex?: boolean;
} = {}): Metadata {
	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [
				{
					url: image,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [image],
			creator: "@pawanpdn-671",
		},
		icons,
		metadataBase: new URL("https://digitaltradehub.vercel.app"),
		...(noIndex && {
			robots: {
				index: false,
				follow: false,
			},
		}),
	};
}
