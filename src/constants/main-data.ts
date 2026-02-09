import type { PageConfig } from "./main-types";

export const initialPages: PageConfig[] = [
    {
    id: "1",
    name: "Digital Presence",
    url: "http://digital-presence.psth.com/",
  },
 
  {
    id: "2",
    name: "Docker 1 - Overview",
    url: "http://10.144.1.100:9000/#!/home",
  },
  {
    id: "3",
    name: "Docker 1 - Containers",
    url: "http://10.144.1.100:9000/#!/5/docker/containers",
  },
  {
    id: "4",
    name: "Docker 1 - Performance",
    url: "http://10.144.1.100:9000/#!/5/docker/containers/4e5097688f095c1645bb5404f41a5ef7ce8b1acd317998f7309641d2f6ffbad4/stats",
  },
   {
    id: "5",
    name: "Grafana",
    url: "http://10.144.1.90:3000/d/41URQF7mz/zabbix-full-server-status?orgId=1&from=now-6h&to=now&timezone=browser&var-Group=Zabbix%20servers&var-Host=Zabbix%20server&var-Disk=$__all&var-Filesystem=$__all&var-Network=$__all&refresh=auto",
  },
   {
    id: "6",
    name: "WMS",
    url: "http://10.144.1.91/psth/pegasus/dashboard.php",
  },

   
];