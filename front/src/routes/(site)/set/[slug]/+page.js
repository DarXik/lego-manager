export const load = async ({ params, data }) => {

    return {
        ...data,
        slug: params.slug
    }
}