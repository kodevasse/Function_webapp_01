<template>
  <div
    class="navbar fixed lg:flex flex-col justify-start h-screen border-r bg-base-100 sm:w-[18rem] w-[87%] transition-all duration-200 ease-in-out transform lg:translate-x-0"
    :class="!globalStore.menuOpen && '-translate-x-[42rem] '"
    @click.self
  >
    <div class="px-1 py-6 flex flex-col w-full items-start h-full">
      <h1
        class="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-primary to-secondary"
      >
        Boilerplate <span class="text-gray-600"></span
        ><span class="text-gray-600"></span
        ><span
          class="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400"
          >Vue.js 3</span
        >
      </h1>

      <nav aria-label="Main Nav" class="flex flex-col mt-6 space-y-1 w-full">
        <!-- DROPDOWN SELECTOR IN SIDEMENU-->

        <div
          @click.prevent="showDropdown = !showDropdown"
          class="inline-flex items-stretch rounded-xl border border-gray-300 bg-gray-200 cursor-pointer mb-5 hidden"
          :class="showDropdown && ' bg-gray-200'"
        >
          <div
            class="rounded-l-md px-4 py-2.5 text-md w-full text-gray-600 hover:text-gray-700"
          >
            <div class="flex flex-col">
              <span class="font-mono tracking-tight text-xs">PROJECT</span>
              <span class="font-bold text-gray-900">Personal</span>
            </div>
          </div>

          <div class="relative">
            <button
              class="inline-flex h-full items-center justify-center rounded-r-md border-gray-100 px-2 text-gray-600 hover:text-gray-700"
            >
              <span class="sr-only">Menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <Transition>
              <div
                v-if="showDropdown"
                ref="dropdown"
                class="dropdown fixed right-0 z-10 mt-4 sm:w-[14.75rem] w-11/12 mx-auto left-0 origin-top-right rounded-xl border-gray-200 border-[0.15rem] bg-base-100 shadow-lg"
                role="menu"
              >
                <div class="flow-root py-2">
                  <div class="relative sm:block py-2">
                    <label class="sr-only" for="search"> Search </label>

                    <input
                      class="h-12 mx-auto sm:w-[14rem] w-[17rem] form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-200 bg-clip-padding border border-solid border-gray-300 rounded-xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-gray-200 focus:border-blue-600 focus:outline-none"
                      id="text"
                      type="text"
                      v-model="globalStore.searchProject"
                      placeholder="Search..."
                      @click.stop
                    />

                    <button
                      type="button"
                      class="absolute top-1/2 right-1 -translate-y-1/2 rounded-md bg-gray-50 p-2 mr-4 text-gray-600 transition hover:text-gray-700"
                    >
                      <span class="sr-only">Submit Search</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div class="-my-2 divide-y divide-gray-100">
                    <div class="p-2">
                      <strong
                        class="block p-2 text-xs font-medium uppercase text-gray-400"
                      >
                        YOUR PROJECTS
                      </strong>

                      <a
                        href="#"
                        class="block rounded-lg px-4 py-2 text-md text-gray-800 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                      >
                        Personal
                      </a>

                      <a
                        href="#"
                        class="block rounded-lg px-4 py-2 text-md text-gray-800 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                      >
                        Work Emails
                      </a>

                      <a
                        href="#"
                        class="block rounded-lg px-4 py-2 text-md text-gray-800 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                      >
                        Office stuff
                      </a>
                    </div>

                    <div class="">
                      <div
                        class="w-full justify-between flex flex-row gap-2 p-2 pl-6 rounded-lg px-4 text-md font-bold text-gray-900 hover:bg-gray-200 border-t border-gray-"
                        role="menuitem"
                      >
                        See all projects
                        <IconArrow />
                      </div>
                    </div>
                    <div>
                      <button
                        class="flex w-full items-center gap-1 p-2 border-t rounded-lg px-2 pl-6 text-md font-bold text-blue-400 hover:bg-gray-200"
                        role="menuitem"
                      >
                        <IconAddCircle class="w-5" />

                        New project
                      </button>
                    </div>
                  </div>
                </div>
              </div></Transition
            >
          </div>
        </div>

        <!-- END OF DROPWDOWN-->

        <RouterLink
          to="/tool"
          class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-base-200"
          active-class="bg-base-200"
        >
          <div
            class="flex-shrink-0 transition-all duration-500 overflow-hidden"
            :class="[$route.path === '/tool' ? 'w-4' : 'w-0']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span
            ref="textRef"
            class="transition-all duration-500 ml-3 text-md font-medium"
            >Tool</span
          >
        </RouterLink>
        <RouterLink
          to="/dalle"
          class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-base-200"
          active-class="bg-base-200"
        >
          <div
            class="flex-shrink-0 transition-all duration-500 overflow-hidden"
            :class="[$route.path === '/dalle' ? 'w-4' : 'w-0']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>

          <span
            ref="textRef"
            class="transition-all duration-500 ml-3 text-md font-medium"
            >DALL-E</span
          >
        </RouterLink>

        <RouterLink
          to="/templates"
          class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-base-200"
          active-class="bg-base-200"
        >
          <div
            class="flex-shrink-0 transition-all duration-500 overflow-hidden"
            :class="[$route.path === '/templates' ? 'w-4' : 'w-0']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>

          <span
            ref="textRef"
            class="transition-all duration-500 ml-3 text-md font-medium"
          >
            Templates
          </span>
        </RouterLink>

        <RouterLink
          to="/documents"
          class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-base-200"
          active-class="bg-base-200"
        >
          <div
            class="flex-shrink-0 transition-all duration-500 overflow-hidden"
            :class="[$route.path === '/documents' ? 'w-4' : 'w-0']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>

          <span
            ref="textRef"
            class="transition-all duration-500 ml-3 text-md font-medium"
          >
            Documents
          </span>
        </RouterLink>

        <RouterLink
          to="/examples"
          class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-base-200"
          active-class="bg-base-200"
        >
          <div
            class="flex-shrink-0 transition-all duration-500 overflow-hidden"
            :class="[$route.path === '/examples' ? 'w-4' : 'w-0']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>

          <span
            ref="textRef"
            class="transition-all duration-500 ml-3 text-md font-medium"
          >
            Examples
          </span>
        </RouterLink>

        <details class="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            class="flex items-center px-4 py-2 text-gray-800 rounded-lg cursor-pointer hover:bg-base-200 hover:text-gray-700"
          >
            <div
              class="flex-shrink-0 transition-all duration-500 overflow-hidden"
              :class="[
                $route.path === '/subscription' || $route.path === '/settings'
                  ? 'w-4'
                  : 'w-0',
              ]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>

            <span class="ml-3 text-md font-medium"> Account </span>

            <span
              class="ml-auto transition duration-300 shrink-0 group-open:-rotate-180"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <nav aria-label="Account Nav" class="mt-1.5 ml-8 flex flex-col">
            <RouterLink
              to="/subscription"
              class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-base-200"
              active-class="bg-base-200"
            >
              <div
                class="flex-shrink-0 transition-all duration-500 overflow-hidden"
                :class="[$route.path === '/subscription' ? 'w-4' : 'w-0']"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 opacity-75"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>

              <span
                ref="textRef"
                class="transition-all duration-500 ml-3 text-md font-medium"
              >
                Subscription
              </span>
            </RouterLink>
            <RouterLink
              to="/settings"
              class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-base-200"
              active-class="bg-base-200"
            >
              <div
                class="flex-shrink-0 transition-all duration-500 overflow-hidden"
                :class="[$route.path === '/settings' ? 'w-4' : 'w-0']"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>

              <span
                ref="textRef"
                class="transition-all duration-500 ml-3 text-md font-medium"
              >
                User Settings
              </span>
            </RouterLink>

            <!-- <a
              href="#"
              class="flex items-center px-4 py-2 text-gray-800 rounded-lg hover:bg-base-200 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>

              <span class="ml-3 text-md font-medium"> Security </span>
            </a> -->

            <div>
              <button
                @click="storeAuth.logoutUser()"
                class="flex items-center w-full px-4 py-2 text-red-400 rounded-lg hover:bg-red-200 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 opacity-75"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>

                <span class="ml-3 text-md font-medium"> Logout </span>
              </button>
            </div>
          </nav>
        </details>
        <RouterLink
          to="/help"
          class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-base-200"
          active-class="bg-base-200"
        >
          <div
            class="flex-shrink-0 transition-all duration-500 overflow-hidden"
            :class="[$route.path === '/help' ? 'w-4' : 'w-0']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>

          <span
            ref="textRef"
            class="transition-all duration-500 ml-3 text-md font-medium"
          >
            Help
          </span>
        </RouterLink>
        <RouterLink
          to="/faq"
          class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-base-200"
          active-class="bg-base-200"
        >
          <div
            class="flex-shrink-0 transition-all duration-500 overflow-hidden"
            :class="[$route.path === '/faq' ? 'w-4' : 'w-0']"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 opacity-75"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>

          <span
            ref="textRef"
            class="transition-all duration-500 ml-3 text-md font-medium"
          >
            FAQ
          </span>
        </RouterLink>
      </nav>
      <div class="border-t border-base-300 w-full mt-20">
        <RouterLink
          to="/subscription"
          href="#"
          class="flex items-center p-4 shrink-0 hover:bg-base-200 rounded-md"
        >
          <img
            alt="Man"
            :src="storeAuth.user.photoURL"
            class="object-cover w-10 h-10 rounded-full"
          />

          <div class="ml-1.5">
            <p class="text-xs">
              <strong class="block font-medium">{{
                storeAuth.user.displayName
              }}</strong>

              <span> {{ storeAuth.user.email }} </span>
            </p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import { RouterLink, useRoute } from "vue-router";
import IconLogo01 from "@/components/icons/IconLogo01.vue";
import { useGlobalStore } from "@/stores/globalStore";
import { useStoreAuth } from "@/stores/storeAuth";
import IconAddCircle from "@/components/icons/IconAddCircle.vue";
import IconArrow from "@/components/icons/IconArrow.vue";
const route = useRoute();
const storeAuth = useStoreAuth();
const globalStore = useGlobalStore();

// DROPDOWN function
const showDropdown = ref(false);
const dropdownRef = ref(false);

window.addEventListener("click", (event) => {
  console.log("clicked outside");
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showDropdown.value = false;
  }
});
watch(
  () => globalStore.menuStatus,
  (openMenu) => {
    console.log("openMenu", openMenu);
    if (!openMenu) {
      showDropdown.value = false;
    }
  }
);

// const closeNavbar = (event) => {
//   // Check if the click was fired from within the navbar element
//   if (event.target.closest(".navbar" & (globalStore.menuOpen === true))) {
//     return;
//   }

//   globalStore.menuOpen = false;
// };

// onMounted(() => {
//   // Add the click event listener to the document
//   document.addEventListener("click", closeNavbar);
// });
const textRef = ref(null);
// watch(route, (newRoute, oldRoute) => {
//   if (newRoute.path === "/tool") {
//     textRef.value.style.transition = "all 0.5s";
//     textRef.value.style.marginLeft = "0.7rem";
//   } else {
//     textRef.value.style.transition = "all 0.5s";
//     textRef.value.style.marginLeft = "0.5rem";
//   }
// });

// onMounted(() => {
//   if (route.path === "/tool") {
//     textRef.value.style.marginLeft = "0.7rem";
//   }
// });
</script>

<style scoped>
.dropdown {
  /* style the dropdown */
}
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease-in-out;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
