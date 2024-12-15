import type { NitroFetchRequest } from 'nitropack'
import type { FetchOptions } from 'ofetch'
import qs from 'qs'
export const useApi = (apiUrl?: string) => {
  const { locale } = useNuxtApp().$i18n
  const baseURL =
    apiUrl ||
    (import.meta.env.VITE_APP_BASE_URL as string) ||
    'https://api.asialuxe.app'
  const mainToken = useCookie('token')
  const publicToken =
    'oqO7ALyHbi41BKJ-7QJ7PXLa59P1LEGmQp0UlkWCunsqqsQvz_1a5jFKRvHM_anc'
  function $service(options?: FetchOptions) {
    // You can add your global request headers
    // eslint-disable-next-lin
    if (options?.params) {
      const convertedOptions = new URLSearchParams(
        qs.stringify(options.params, {
          indices: true,
          encode: false,
        }),
      )
      options.params = Object.fromEntries(convertedOptions)
    }
    const headers: Record<string, any> = {}
    const token = useCookie('token')
    Object.assign(headers, {
      Authorization: `Bearer ${token.value ? token.value : publicToken}`,
      'Accept-language': locale.value,
    })
    Object.assign(headers, options?.headers)
    return $fetch.create({
      ...options,
      baseURL,
      headers,
    })
  }

  function $get<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      $service(options)(endpoint)
        // eslint-disable-next-line
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.status === 401) {
            mainToken.value = null
          }
          reject(error.response)
        })
    })
  }

  function $post<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      $service({ ...options, method: 'POST' })(endpoint)
        // eslint-disable-next-line
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.status === 401) {
            mainToken.value = null
          }
          reject(error.response)
        })
    })
  }

  function $put<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      $service({ ...options, method: 'PUT' })(endpoint)
        // eslint-disable-next-line
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.status === 401) {
            mainToken.value = null
          }
          reject(error.response)
        })
    })
  }

  function $patch<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      $service({ ...options, method: 'PATCH' })(endpoint)
        // eslint-disable-next-line
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.status === 401) {
            mainToken.value = null
          }
          reject(error.response)
        })
    })
  }

  function $delete<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      $service({ ...options, method: 'DELETE' })(endpoint)
        // eslint-disable-next-line
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.status === 401) {
            mainToken.value = null
          }
          reject(error.response)
        })
    })
  }

  return {
    baseURL,
    $get,
    $post,
    $put,
    $patch,
    $delete,
  }
}
