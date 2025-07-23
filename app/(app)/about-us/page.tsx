import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div>
      <section className="py-24 relative lg:px-32">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
            <div className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
              <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                <Image
                  className="rounded-xl object-cover"
                  src="https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="about Us image"
                  height={500}
                  width={500}
                />
              </div>
              <Image
                className="sm:ml-0 ml-auto rounded-xl object-cover"
                src="https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="about Us image"
                height={500}
                width={500}
              />
            </div>
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-center items-start gap-8 flex">
                <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                  <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                    Best Hotel in Jaisalmer
                  </h2>
                  <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                    Every project we&apos;ve undertaken has been a collaborative
                    effort, where every person involved has left their mark.
                    Together, we&apos;ve not only constructed buildings but also
                    built enduring connections that define our success story.
                  </p>
                </div>
                <div className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                  <div className="flex-col justify-start items-start inline-flex">
                    <h3 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">
                      33+
                    </h3>
                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                      Years of Experience
                    </h6>
                  </div>
                  <div className="flex-col justify-start items-start inline-flex">
                    <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">
                      125+
                    </h4>
                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                      Successful Projects
                    </h6>
                  </div>
                  <div className="flex-col justify-start items-start inline-flex">
                    <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">
                      52+
                    </h4>
                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                      Happy Clients
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <h1 className="text-4xl font-bold">Image Gallery</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:px-32 px-5 py-10">
        <div>
          <Image
            height={500}
            width={500}
            className="h-auto max-w-full rounded-lg"
            src="https://images.unsplash.com/photo-1638619281167-b134b7fb3095?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div>
          <Image
            height={500}
            width={500}
            className="h-auto max-w-full rounded-lg"
            src="https://images.unsplash.com/photo-1615737986496-1d36ad26ae51?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div>
          <Image
            height={500}
            width={500}
            className="h-auto max-w-full rounded-lg"
            src="https://images.unsplash.com/photo-1663659506588-5d5f24c3eb4a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div>
          <Image
            height={500}
            width={500}
            className="h-auto max-w-full rounded-lg"
            src="https://images.unsplash.com/photo-1623316200785-895cd6b807a6?q=80&w=828&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div>
          <Image
            height={500}
            width={500}
            className="h-auto max-w-full rounded-lg"
            src="https://images.unsplash.com/photo-1663659506663-db6cd215164f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div>
          <Image
            height={500}
            width={500}
            className="h-auto max-w-full rounded-lg"
            src="https://images.unsplash.com/photo-1667125095636-dce94dcbdd96?q=80&w=852&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div>
          <Image
            height={500}
            width={500}
            className="h-auto max-w-full rounded-lg"
            src="https://images.unsplash.com/photo-1714300339419-8377c31205de?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div>
          <Image
            height={500}
            width={500}
            className="h-auto max-w-full rounded-lg"
            src="https://images.unsplash.com/photo-1650893843097-e32411fda3dd?q=80&w=884&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div>
          <Image
            height={500}
            width={500}
            className="h-auto max-w-full rounded-lg"
            src="https://images.unsplash.com/photo-1615688443426-78c43ccb9c71?q=80&w=915&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div>
          <Image
            height={500}
            width={500}
            className="h-auto max-w-full rounded-lg"
            src="https://images.unsplash.com/photo-1646936345966-273c8cd3ce83?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div>
          <Image
            height={500}
            width={500}
            className="h-auto max-w-full rounded-lg"
            src="https://images.unsplash.com/photo-1648726660921-7413e1b0f93b?q=80&w=852&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div>
          <Image
            height={500}
            width={500}
            className="h-auto max-w-full rounded-lg"
            src="https://images.unsplash.com/photo-1587845663781-703f5e1add3a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default page;
