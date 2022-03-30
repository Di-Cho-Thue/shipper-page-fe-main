import axios from "axios";

const prefixDomainJava = (url) => {
    return process.env.REACT_APP_API_ENDPOINT_JAVA + url
}

const prefixDomainCSharp = (url) => {
    return process.env.REACT_APP_API_ENDPOINT_CSHARP + url
}


export const SOURCE = {
    JAVA: "JAVA",
    CSHARP: "CSHARP"
}

const getPrefixDomain = (source, url) => {
    return source === SOURCE.JAVA ? prefixDomainJava(url) : prefixDomainCSharp(url)
}

export const APIGet = async ({ url, params, source = SOURCE.JAVA }) => {
    const response = await axios.get(getPrefixDomain(source, url), { params }).catch((error) => {
        console.log(error)
    });
    const { data, status } = response || {}
    return { data, status };
}
export const APIPost = async ({ url, apiData, source = SOURCE.JAVA }) => {
    const response = await axios.post(getPrefixDomain(source, url), apiData).catch((error) => {
        console.log(error)
    });
    const { data, status } = response || {}
    return { data, status };
}
export const APIPut = async ({ url, apiData, source = SOURCE.JAVA }) => {
    const response = await axios.put(getPrefixDomain(source, url), apiData).catch((error) => {
        console.log(error)
    });
    const { data, status } = response || {}
    return { data, status };
}
export const APIDelete = async ({ url, source = SOURCE.JAVA }) => {
    const response = await axios.delete(getPrefixDomain(source, url)).catch((error) => {
        console.log(error)
    });
    const { data, status } = response || {}
    return { data, status };
}