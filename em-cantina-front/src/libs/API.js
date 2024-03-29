import axios from 'axios'

import { message } from 'antd'

import moment from 'moment'

import _ from 'lodash'

var momentDurationFormatSetup = require('moment-duration-format')

const PUBLIC_ROUTE_PRE = '/api'

const that = {
    getAxiosInstence() {
        let reqHeaders = {}

        return axios.create({
            baseURL: 'http://localhost:9000',
            headers: reqHeaders,
            // timeout: 1000,
        })
    },

    listRoute(url, extraParams = {}) {
        let api = that.getAxiosInstence()

        return new Promise((resolve, reject) => {
            api.get(url, { params: extraParams })
                .then((apiResp) => {
                    let res = apiResp.data
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    showRoute(url, extraParams = {}) {
        let api = that.getAxiosInstence()

        return new Promise((resolve, reject) => {
            api.get(url, { params: extraParams })
                .then((apiResp) => {
                    let res = apiResp.data

                    resolve(res)
                })
                .catch((err) => {
                    if (
                        !_.isNil(err.response) &&
                        !_.isNil(err.response.status) &&
                        err.response.status !== 404
                    ) {
                        message.error('Une erreur est survenue.')
                    }

                    reject(err)
                })
        })
    },
    createRoute(url, values) {
        let api = that.getAxiosInstence()

        return new Promise((resolve, reject) => {
            api.post(url, values)
                .then((apiResp) => {
                    let res = apiResp
                    resolve(res)
                })
                .catch((err) => {
                    message.error('Création impossible.')
                    reject(err)
                })
        })
    },
    updateRoute(url, values) {
        let api = that.getAxiosInstence()

        return new Promise((resolve, reject) => {
            api.put(url, values)
                .then((apiResp) => {
                    let res = apiResp.data

                    resolve(res)
                })
                .catch((err) => {
                    message.error('Enregistrement impossible.')
                    reject(err)
                })
        })
    },
    deleteRoute(url, extraParams = {}, extraData = {}) {
        let api = that.getAxiosInstence()

        return new Promise((resolve, reject) => {
            api.delete(url, { params: extraParams, data: extraData })
                .then((apiResp) => {
                    resolve(apiResp)
                })
                .catch((err) => {
                    message.error('Suppression impossible.')
                    reject(err)
                })
        })
    },

    getRecipes(params) {
        return that.showRoute(`${PUBLIC_ROUTE_PRE}/recipes/`, params)
    },

    deleteRecipe(id) {
        return that.deleteRoute(`${PUBLIC_ROUTE_PRE}/recipe/${id}`)
    },

    getSpecificRecipe(id) {
        return that.showRoute(`${PUBLIC_ROUTE_PRE}/recipe/${id}`)
    },

    createRecipe(values = {}) {
        return that.createRoute(`${PUBLIC_ROUTE_PRE}/recipes`, values)
    },

    updateRecipe(id, values = {}) {
        return that.updateRoute(`${PUBLIC_ROUTE_PRE}/recipe/${id}`, values)
    },

    format: {
        convertTime(hours) {
            if (hours > 60) {
                return moment.duration(hours, 'minutes').format('HH:mm')
            } else {
                return hours + ' min'
            }
        },
    },

    utils: {
        setOptionsLs(optionsList) {
            return localStorage.setItem('options', JSON.stringify(optionsList))
        },
        getOptionsLs(key) {
            let ls = localStorage.getItem(key)
            return JSON.parse(ls)
        },
    },
}

export default that
