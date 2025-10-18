import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resuming" },
    { name: "description", content: "Smart feedback for your dream jobs" },
  ];
}

export default function Home() {
    const { auth, kv } = usePuterStore();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);


    useEffect(() => {
        if(!auth.isAuthenticated) navigate("/auth?next=/");
    }, [auth.isAuthenticated]);

    useEffect(() => {
        const loadResumes = async() => {
            setLoadingResumes(true);

            // mengambil semua data yang di simpan puter di local memory dengan keyvalue KV
            const resumes = (await kv.list("resume:*", true)) as KVItem[];

            const parseResumes = resumes?.map((resume) => (
                JSON.parse(resume.value) as Resume
            ));

            console.log("parseResumes", parseResumes);
            setResumes(parseResumes || [])
            setLoadingResumes(false);
        }

        loadResumes();
    }, []);


  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
          <div className="page-heading py-16">
              <h1>Lacak Aplikasi Anda & Lanjutkan Peringkat</h1>
              {!loadingResumes && resumes?.length === 0 ? (
                <h2>Tidak ada resume yang di temukan. Silahkan upload resume pertamamu.</h2>
              ) : (
                  <h2>Tinjau kiriman Anda dan periksa masukan yang didukung AI.</h2>
              )}
          </div>
          {loadingResumes && (
              <div className="flex flex-col items-center justify-center">
                  <img src="/images/resume-scan-2.gif" alt="logo" className="w-[200px]" />
              </div>
          )}

          {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
              {resumes.map((resume) => (
                  <ResumeCard key={resume.id} resume={resume} />
              ))}
          </div>
          )}

          {!loadingResumes && resumes?.length === 0 && (
              <div className="flex flex-col items-center justify-center mt-10 gap-4">
                  <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
                      Upload Resume
                  </Link>
              </div>
          )}
      </section>
  </main>;
}
