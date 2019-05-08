import { connect } from "react-redux"

const options = [];
for (let i = 0; i < 100; ++i) {
    options.push({
        value: i + 1,
        label: `آیتم شماره ${i + 1}`
    });
}

const loadOptions = async (search, prevOptions) => {
    console.log(prevOptions[prevOptions.length-1])
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


loadOptions.contextTypes = {
    t: PropTypes.func.isRequired
}


function mapStateToProps(state) {
    const {SelectFileAudience_totalCount,SelectFileAudience_rows} = state.Auto_BasicInfo;
    const {SelectFileAudience_rows} = state.Auto_BasicInfo
    return {
        SelectFileAudience_totalCount,
        SelectFileAudience_rows,
    };
}

const connectedloadOptions = connect(mapStateToProps, mapDispatchToProps)(loadOptions);
export { connectedloadOptions as loadOptions };
