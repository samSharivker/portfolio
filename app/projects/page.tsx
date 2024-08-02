"use client";

import Link from "next/link";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useState, useEffect } from "react";

interface Project {
  title: string;
  description: string;
  cardID: string;
  repo: string;
  view?: string;
}

export default function Projects() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      const fetchData = async () => {
        const response = await fetch("/api/projects");
        const result = await response.json();
        setData(result.projects);
        setLoading(false);
      };

      fetchData();
    }
  }, [loading]);

  return (
    <div>
      {loading ? (
        <h1 className="text-white text-center">Loading...</h1>
      ) : (
        <div className="bg-gradient-to-b from-black via-gray-300 to-black z-10">
          <div className="relative z-10 p-5">
            <div className="justify-items-center m-auto grid lg:grid-cols-2 grid-cols-1">
              {data.map((item) => (
                <CardContainer className="inter-var cursor-pointer">
                  <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                    <CardItem
                      translateZ="50"
                      className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                      {item.title}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                    >
                      {item.description}
                    </CardItem>
                    <CardItem translateZ="100" className="w-full mt-4">
                      <Image
                        src={item.cardID}
                        height="1000"
                        width="1000"
                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                      />
                    </CardItem>
                    <div className="flex justify-between items-center mt-20">
                      <CardItem
                        translateZ={20}
                        as={Link}
                        href={item.repo}
                        target="__blank"
                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                      >
                        <span className="text-xl">
                          <i className="bi bi-github"></i> Code
                        </span>
                      </CardItem>
                      {item.view && (
                        <CardItem
                          translateZ={20}
                          as={Link}
                          href={item.repo}
                          target="__blank"
                          className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                        >
                          <span className="text-xl">
                            <i className="bi bi-link-45deg"></i> Preview
                          </span>
                        </CardItem>
                      )}
                    </div>
                  </CardBody>
                </CardContainer>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
