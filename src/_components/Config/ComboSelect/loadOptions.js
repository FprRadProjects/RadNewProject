

const loadOptions = async (search, prevOptions,Params,fetchData,options) => {
    console.log(Params)
    console.log("1111111111111111111111111111")
    console.log(fetchData)
    console.log("222222222222222222222222222222")
    console.log(prevOptions)
    console.log("33333333333333333333333333333")
    console.log(options)
    console.log("444444444444444444444444444")
    Params.pagesize=40;
    fetchData(Params);
    let filteredOptions;
    if (!search) {
        filteredOptions = options;
    } else {
        const searchLower = search.toLowerCase();

        filteredOptions = options.filter(({ label }) =>
            label.toLowerCase().includes(searchLower)
        );
    }

    const hasMore = filteredOptions.length > prevOptions.length + 10;
    const slicedOptions = filteredOptions.slice(
        prevOptions.length,
        prevOptions.length + 10
    );

    return {
        options: slicedOptions,
        hasMore
    };
};



export default loadOptions;
