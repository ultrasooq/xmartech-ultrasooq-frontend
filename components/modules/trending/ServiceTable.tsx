/**
 * @file ServiceTable.tsx
 * @description Simple service listing table component for the trending page.
 *   Renders services in a tabular format with image, service name, category,
 *   and type columns.
 *
 * @props
 *   - services {any[]} - Array of service objects to display in the table.
 *
 * @behavior
 *   - Renders a shadcn Table with header columns: Service (image + name),
 *     Category, and Type.
 *   - Each row shows a service image (with URL validation fallback to
 *     placeholder), service name as a link to `/trending/{id}`, category
 *     name, and sell type.
 *   - Image thumbnail is 64x64px with rounded corners.
 *   - Supports RTL layout via `langDir` from AuthContext.
 *
 * @dependencies
 *   - Table, TableBody, TableCell, TableHead, TableHeader, TableRow (shadcn) - Table UI.
 *   - validator - URL validation for service images.
 *   - useAuth (AuthContext) - Language direction.
 *   - useTranslations (next-intl) - i18n translations.
 */
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import validator from "validator";
import Link from "next/link";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

type ServiceTableProps = {
    services: any[];
};

const ServiceTable: React.FC<ServiceTableProps> = ({ services }) => {
    const t = useTranslations();
    const { langDir } = useAuth();

    return (
        <CardContent className="main-content w-full">
            <Card className="main-content-card p-0! shadow-none">
                <div className="table-responsive theme-table-s1">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead dir={langDir} translate="no">{t("service")}</TableHead>
                                <TableHead dir={langDir} translate="no">{t("category")}</TableHead>
                                <TableHead dir={langDir} translate="no">{t("type")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {services?.map((item: any) => (
                                <TableRow key={item.id}>
                                    <TableCell th-name="Product">
                                        <Link href={`/services/${item.id}`}>
                                            <figure className="product-image-with-text">
                                                <div className="image-container rounded-lg">
                                                    <Image
                                                        src={
                                                            item?.images?.[0]?.url && validator.isURL(item.images[0].url)
                                                                ? item.images[0].url
                                                                : PlaceholderImage
                                                        }
                                                        alt="product-image"
                                                        height={80}
                                                        width={80}
                                                    />
                                                </div>
                                                <figcaption>{item?.serviceName}</figcaption>
                                            </figure>
                                        </Link>
                                    </TableCell>
                                    <TableCell th-name="Category">{item?.category?.name}</TableCell>
                                    <TableCell th-name="Type">{item?.serviceType}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </CardContent>
    );
};

export default ServiceTable;
