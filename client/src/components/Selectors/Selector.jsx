import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Selector({getSelectedCategory}) {
  return (
    <Select onValueChange={getSelectedCategory}>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="development">Development</SelectItem>
          <SelectItem value="design">Design</SelectItem>
          <SelectItem value="business">Business</SelectItem>
          <SelectItem value="data-science">Data Science</SelectItem>
          <SelectItem value="marketing">Marketing</SelectItem>
          <SelectItem value="finance">Finance & Accounting</SelectItem>
          <SelectItem value="personal-dev">Personal Development</SelectItem>
          <SelectItem value="it-software">IT & Software</SelectItem>
          <SelectItem value="health-fitness">Health & Fitness</SelectItem>
          <SelectItem value="music">Music</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}