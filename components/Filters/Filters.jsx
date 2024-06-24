"use client";
import { useTheme } from "@/context/ThemeProvider";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery } from "@/lib/utils";

const Filters = ({ resume }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUrlUpdated, setIsUrlUpdated] = useState(true);
  const { setNationality, setJob, setContractType } = useTheme();
  const handleChangeNationality = (value) => {
    setNationality(value);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "nationalityfilter",
      value,
    });
    router.push(newUrl, { scroll: false });
    setIsUrlUpdated(false);
  };
  const handleChangeJob = (value) => {
    setJob(value);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "jobfilter",
      value,
    });
    router.push(newUrl, { scroll: false });
    setIsUrlUpdated(false);
  };
  const handleChangeContract = (value) => {
    setContractType(value);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "contractfilter",
      value,
    });
    router.push(newUrl, { scroll: false });
    setIsUrlUpdated(false);
  };

  const handleFilterClick = () => {
    setIsSubmitting(true);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
    });
    try {
      router.push(`/filteresults/${newUrl}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(true);
    }
  };
  useEffect(() => {
    // This useEffect will trigger whenever the URL changes
    const handleRouteChange = () => {
      setIsUrlUpdated(true);
    };
    handleRouteChange();
  }, [searchParams]);
  // const UniqueResumesJob = [...new Set(resume?.map((res) => res.job))];
  // const UniqueResumesNationality = [
  //   ...new Set(resume?.map((res) => res.nationality)),
  // ];
  // const UniqueContractNationality = [
  //   ...new Set(resume?.map((res) => res.contractType)),
  // ];
  // console.log("uniques resume jobs", UniqueResumesJob);
  // console.log("uniques resume Nationality", UniqueResumesNationality);
  return (
    <div className="flex justify-center items-center gap-5 mt-10 ">
      <Select
        dir="rtl"
        onValueChange={handleChangeNationality}
        disabled={!isUrlUpdated}
      >
        <SelectTrigger className="w-[150px] max-sm:w-[70px]">
          <SelectValue placeholder="الجنسية" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>الجنسية</SelectLabel>
            <SelectItem value="الفلبين">الفلبين</SelectItem>
            <SelectItem value="اثيوبيا">اثيوبيا</SelectItem>
            <SelectItem value="اوغندا">اوغندا</SelectItem>
            <SelectItem value="سريلانكا">سريلانكا</SelectItem>
            <SelectItem value="كينيا">كينيا</SelectItem>
            <SelectItem value="بنجلاديش">بنجلاديش</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        dir="rtl"
        onValueChange={handleChangeJob}
        disabled={!isUrlUpdated}
      >
        <SelectTrigger className="w-[150px] max-sm:w-[70px]">
          <SelectValue placeholder="المهنة" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>المهنة</SelectLabel>
            <SelectItem value="عاملات منزليات">عاملات منزليات</SelectItem>
            <SelectItem value="سائقين">سائقين</SelectItem>
            <SelectItem value="متخصصات في خدمة رعاية كبار السن">
              متخصصات في خدمة رعاية كبار السن
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        dir="rtl"
        onValueChange={handleChangeContract}
        disabled={!isUrlUpdated}
      >
        <SelectTrigger className="w-[150px] max-sm:w-[70px]">
          <SelectValue placeholder="نوع العقد" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>نوع العقد</SelectLabel>
            <SelectItem value="استقدام">استقدام</SelectItem>
            <SelectItem value="نقل خدمات">نقل خدمات</SelectItem>
            <SelectItem value="إيجار">إيجار</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        className={` text-white bg-[#2e2ee3]
         hover:bg-[#2e2ee3] hover:opacity-80 
         w-[70px] h-[40px] max-md:w-[150px] max-sm:w-[70px] ${
           isSubmitting ? "text-[10px]" : "font-bold"
         }`}
        onClick={handleFilterClick}
        disabled={isSubmitting || !isUrlUpdated ? true : false}
      >
        {isSubmitting ? "جاري البحث" : "بحث"}
      </Button>
    </div>
  );
};

export default Filters;
