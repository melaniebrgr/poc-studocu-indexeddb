'use client'

import { NotebookText } from "lucide-react"
import { useLiveQuery } from "dexie-react-hooks"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useGetAllSummaries as useGetAllVanillaSummaries  } from "@/app/components/IDBVanillaCard/useIDB";
import { useGetAllSummaries as useGetAllIdbSummaries } from "./IDBIdbCard/useIDB";
import { db, IDB_STORE_ID } from "@/app/components/IDBDexieCard/db";

export function AppSidebar() {
  const summariesVanillaJs = useGetAllVanillaSummaries();
  const summariesIdb = useGetAllIdbSummaries() ?? [];
  const summariesDexie = useLiveQuery(() => db[IDB_STORE_ID].toArray()) ?? [];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Vanilla JS Summaries</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {summariesVanillaJs.map((summary) => (
                <SidebarMenuItem key={summary.title}>
                  <SidebarMenuButton asChild>
                    <a>
                      <NotebookText />
                      <span>{summary.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>IDB Summaries</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {summariesIdb.map((summary) => (
                <SidebarMenuItem key={summary.title}>
                  <SidebarMenuButton asChild>
                    <a>
                      <NotebookText />
                      <span>{summary.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Dexie Summaries</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {summariesDexie.map((summary) => (
                <SidebarMenuItem key={summary.title}>
                  <SidebarMenuButton asChild>
                    <a>
                      <NotebookText />
                      <span>{summary.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
