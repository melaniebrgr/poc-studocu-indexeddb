'use client'

import { NotebookText } from "lucide-react"

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
import { getTransaction, useIDB } from "@/app/components/IDBVanillaCard/useIDB";
import { useEffect, useState } from "react";

interface Summary { id: string, title: string }

export function AppSidebar() {
  const { db } = useIDB();
  const [summaries, setSummaries] = useState<Summary[]>([]);

  useEffect(() => {
    if (!db) return;
    const txRead = getTransaction(db, 'readonly');
    const request = txRead!.getAll();
    request.onsuccess = () => {
      setSummaries(request.result);
    }
  }, [db]);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Summaries</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {summaries.map((summary) => (
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
