export const load = async ({ params, locals }) => {
    let slug = params.slug
    console.log(slug)
    const response = await fetch(`http://localhost:3000/api/v1/sets/${slug}`, {
        method: "GET",
        headers: {
            "Authorization": locals.session || ""
        }
    })
    let res1 = await response.json()
    console.log(res1)
    
    if (response.ok) {
        return {
            set:  res1
        }
    }
    else{
        return  {
            set: null
        }
    }
}