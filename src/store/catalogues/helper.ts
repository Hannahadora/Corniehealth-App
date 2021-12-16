import { cornieClient } from "@/plugins/http";
import ICatalogueService, { ICatalogueProduct } from "@/types/ICatalogue";

export const getServices = async () => {
    try {
        const response = await cornieClient().get("/api/v1/catalogue-service/");

        return response.data;
    } catch (error) {}
};

export const getProducts = async () => {
    try {
        const response = await cornieClient().get("/api/v1/catalogue-product/");

        return response.data;
    } catch (error) {}
};

export const createService = async (body: ICatalogueService) => {
    try {
        const response = await cornieClient().post(
            "/api/v1/catalogue-service/",
            body
        );

        return response.data;
    } catch (error) {}
};

export const createProduct = async (body: ICatalogueProduct) => {
    try {
        const response = await cornieClient().post(
            "/api/v1/catalogue-product/",
            body
        );

        return response.data;
    } catch (error) {}
};

export const updateService = async (data: ICatalogueService) => {
    try {
        const body = { ...data };
        delete body.id;
        delete body.organizationId;
        delete body.createdAt;
        delete body.updatedAt;

        const response = await cornieClient().put(
            `/api/v1/catalogue-service/${data.id}`,
            body
        );
        return response.data;
    } catch (error) {}
};

export const deleteService = async (id: string) => {
    try {
        const response = await cornieClient().delete(
            `/api/v1/catalogue-service/${id}`
        );

        return response.data;
    } catch (error) {}
};
