import { useState, useEffect } from 'react'
import { fetchGetCategories, fetchGetCategory } from '@/api/category'
import { Category } from '@/types'
import { fetchGetCareerCategories } from '@/api/careerCategories'

export function RecruitsCategory() {
  const [categoryId, setCategoryId] = useState<
    { text: string; value: number }[]
  >([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGetCategories()

        const categoryId = data.map((category: Category) => ({
          text: category.name,
          value: category.id,
        }))
        setCategoryId(categoryId)
      } catch (error) {
        console.error('Error', error)
      }
    }

    fetchData()
  }, [])

  return categoryId
}

export function RecruitsSubCategory1() {
  const [subCategoryId, setSubCategoryId] = useState<
    { label: string; value: number }[]
  >([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGetCategory('1')

        const subcategoryId =
          data?.subCategories?.map((subCategory: Category) => ({
            value: subCategory.id,
            label: subCategory.name,
          })) || []
        setSubCategoryId(subcategoryId)
      } catch (error) {
        console.error('Error', error)
      }
    }

    fetchData()
  }, [])

  return subCategoryId
}

export function RecruitsSubCategory2() {
  const [subCategoryId, setSubCategoryId] = useState<
    { label: string; value: number }[]
  >([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGetCategory('2')

        const subcategoryId =
          data?.subCategories?.map((subCategory: Category) => ({
            value: subCategory.id,
            label: subCategory.name,
          })) || []
        setSubCategoryId(subcategoryId)
      } catch (error) {
        console.error('Error', error)
      }
    }

    fetchData()
  }, [])

  return subCategoryId
}

export function RecruitsCareerCategory() {
  const [careerCategoryId, setCareerCategoryId] = useState<
    { text: string; value: number }[]
  >([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGetCareerCategories()

        const careerCategoryId = data.map((category: Category) => ({
          text: category.name,
          value: category.id,
        }))
        setCareerCategoryId(careerCategoryId)
      } catch (error) {
        console.error('Error', error)
      }
    }

    fetchData()
  }, [])

  return careerCategoryId
}
