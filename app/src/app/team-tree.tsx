"use client"
import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight, UsersRound } from "lucide-react";
import { GetTeamsObj } from "@/lib/types";

interface FileTreeItem {
  id: number;
  name: string;
  children?: FileTreeItem[];
}
const FileTreeItem = (props: FileTreeItem) => {
  const { name, children } = props;
  if (!children || children.length === 0) {
    return (
      <div className="flex items-center gap-2 pl-10 py-1">
        <UsersRound className="h-4 w-4" /> {name}
      </div>
    );
  }

  return (
    <Collapsible className="pl-4">
      <CollapsibleTrigger className="w-full group flex items-center gap-2 py-1">
        <ChevronRight className="h-4 w-4 group-data-[state=open]:rotate-90 transition-transform" />
        <span className="flex items-center gap-2">
          <UsersRound className="h-4 w-4 fill-current" /> {name}
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {children.map((child) => (
          <FileTreeItem key={child.name} {...child} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

interface TeamTreeProps {
  teams: GetTeamsObj[];
}
export function TeamTree(props: TeamTreeProps) {
  const { teams } = props;

  const teamsRoot: FileTreeItem[] = teams
    .filter(team => !team.parent)
    .map(team => ({ id: team.id, name: team.name }));
  
  const bfs = [...teamsRoot];
  while (bfs.length > 0) {
    const item = bfs.pop();
    if (!item) { break; }
    const teamItems: FileTreeItem[] = teams
      .filter(team => team.parent?.id === item.id)
      .map(team => ({ id: team.id, name: team.name }));
    item.children = teamItems;
    bfs.concat(teamItems);
  }

  return (
    <div className="w-full p-2 rounded-lg">
      <div className="w-full -ml-4">
        {teamsRoot.map((treeItem) => (
          <FileTreeItem key={treeItem.name} {...treeItem} />
        ))}
      </div>
    </div>
  );
}

