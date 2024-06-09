<script setup>
import {
  Copy,
  CreditCard,
  File,
  ListFilter,
  MoreVertical,
  Truck,
} from "lucide-vue-next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Pagination,
  PaginationList,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Checkbox } from "@/components/ui/checkbox";
import { ref, onMounted } from "vue";
import { useGlobalStore } from "../store/user";
import { useSteps } from "../store/stepper";
const globalStore = useGlobalStore();
const stepperStore = useSteps();
const displayPage = ref(false);

onMounted(() => {
  const user = localStorage.getItem("validUser");
  displayPage.value = user && user !== "undefined";

  const userData = localStorage.getItem(globalStore.email);
  if (userData) {
    const userDataObj = JSON.parse(userData);
    globalStore.email = userDataObj.email;
    globalStore.userName = userDataObj.userName;
    globalStore.codeName = userDataObj.codeName;
    globalStore.firstName = userDataObj.firstName;
    globalStore.lastName = userDataObj.lastName;
    globalStore.avatar = userDataObj.avatar;
    globalStore.allReports = userDataObj.allReports;
    globalStore.report = userDataObj.report;
  }
});

function editReport(index) {
  console.log("editing report", index);
  globalStore.report = globalStore.allReports[index];
  globalStore.allReports.splice(index, 1);
  stepperStore.setStep("step1");
  stepperStore.setEditMode(true);
}
function deleteReport(index) {
  globalStore.allReports.splice(index, 1);

  const userData = localStorage.getItem(globalStore.email);
  if (userData) {
    const userDataObj = JSON.parse(userData);
    userDataObj.allReports = globalStore.allReports;
    localStorage.setItem(globalStore.email, JSON.stringify(userDataObj));
  }
}

function changeStep() {
  stepperStore.setStep("step1");
}
</script>

<template>
  <!-- <div class="ml-10 mr-10" v-if="displayPage">
    <Nav></Nav>
    <div class="pt-20 pb-20 h-screen">
      <div class="content-container mx-auto grid grid-cols-12">
        <h1 class="text-2xl col-start-1 col-end-13 place-self-center mb-12">
          Welcome back, {{ globalStore.codeName }}!
        </h1>

        <div class="col-start-1 col-end-7 flex flex-col gap-8">
          <h2>Your Reports:</h2>
          <div class="flex flex-col gap-12">
            <div v-for="(report, index) in globalStore.allReports" :key="index">
              <div
                class="flex w-full justify-between rounded bg-white text-black p-4"
              >
                <div class="flex flex-col gap-2">
                  <p><b>Report Name:</b> {{ report.name }}</p>
                  <p>{{ report.date }}</p>
                </div>
                <div class="flex gap-6">
                  <NuxtLink
                    @click="() => editReport(index)"
                    to="/step1"
                    class="rounded hover:scale-105 h-8 p-4 bg-black text-white flex flex-col items-center justify-center"
                    >EDIT</NuxtLink
                  >

                  <button
                    @click="() => deleteReport(index)"
                    class="rounded hover:scale-105 h-8 p-2 border border-black flex flex-col items-center justify-center"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NuxtLink
          @click="changeStep"
          class="col-start-9 col-end-13 hover:scale-105 rounded h-12 w-52 bg-white text-black flex flex-col items-center justify-center"
          to="/step1"
          >+ CREATE NEW REPORT</NuxtLink
        >
      </div>
    </div>
  </div>
  <div v-else class="h-screen flex place-items-center">
    <div class="m-auto flex flex-col place-items-center gap-20">
      <h1 class="text-3xl">This page is protected</h1>
      <NuxtLink to="/"
        ><button class="rounded h-12 w-48 bg-white text-black">
          LOGIN
        </button></NuxtLink
      >
    </div>
  </div> -->
  <Sheet class="bg-[#151518] pb-12">
    <Nav class="ml-10 mr-10"></Nav>

    <main
      class="dark grid max-w-[1300px] m-auto pb-12 flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2"
    >
      <h1
        class="text-xl xl:text-3xl lg:col-start-1 lg:col-end-3 mx-auto font-bold"
      >
        Welcome back, {{ globalStore.codeName }} !
      </h1>
      <p class="mx-auto lg:col-start-1 lg:col-end-3 text-gray-400 italic">
        “The universe is not only stranger than we imagine, it is stranger than
        we can imagine.”
      </p>
      <div class="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div
          class="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4"
        >
          <Card class="sm:col-span-2">
            <CardHeader class="pb-3">
              <CardTitle class="pb-3">Your Space Mission Reports ✨</CardTitle>
              <CardDescription class="max-w-lg text-balance leading-relaxed">
                In this Dashboard you can manage your reports, edit, delete, or
                create new ones
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button>
                <NuxtLink @click="changeStep" to="/step1"
                  >Create New Report</NuxtLink
                ></Button
              >
            </CardFooter>
          </Card>

          <Card>
            <CardHeader class="pb-2">
              <CardDescription>Current Altitude of ISS</CardDescription>
              <CardTitle class="xl:text-4xl"> 424.03 km </CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-xs text-gray-400">Above Earth's Surface</div>
            </CardContent>
            <CardFooter>
              <Progress :model-value="75" aria-label="Altitude Level" />
            </CardFooter>
          </Card>
          <Card>
            <CardHeader class="pb-2">
              <CardDescription>Current Velocity</CardDescription>
              <CardTitle class="xl:text-3xl text-xl">
                27,573.62 km/h
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-xs text-gray-400">Speed of ISS</div>
            </CardContent>
            <CardFooter>
              <Progress :model-value="50" aria-label="Velocity Level" />
            </CardFooter>
          </Card>
        </div>
        <Tabs default-value="week">
          <div class="flex items-center">
            <TabsList>
              <TabsTrigger value="week"> Week </TabsTrigger>
              <TabsTrigger value="month"> Month </TabsTrigger>
              <TabsTrigger value="year"> Year </TabsTrigger>
            </TabsList>
            <div class="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button
                    variant="outline"
                    size="sm"
                    class="h-7 gap-1 rounded-md px-3"
                  >
                    <ListFilter class="h-3.5 w-3.5" />
                    <span class="sr-only sm:not-sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div class="items-top flex space-x-2">
                      <Checkbox id="terms1" />
                      <label
                        for="terms2"
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Successful
                      </label>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div class="items-top flex space-x-2">
                      <Checkbox id="terms1" />
                      <label
                        for="terms2"
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Declined
                      </label>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                size="sm"
                class="h-7 gap-1 rounded-md px-3"
              >
                <File class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only">Export</span>
              </Button>
            </div>
          </div>
          <TabsContent value="week">
            <Card>
              <CardHeader class="px-7">
                <CardTitle>Mission Reports</CardTitle>
                <CardDescription>
                  Recent missions created by you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow class="hover:bg-black">
                      <TableHead>Mission ID</TableHead>
                      <TableHead class="hidden sm:table-cell">
                        Mission Name
                      </TableHead>
                      <TableHead class="hidden sm:table-cell">
                        Mission Date
                      </TableHead>
                      <TableHead class="hidden md:table-cell">
                        Images</TableHead
                      >
                      <TableHead class="hidden md:table-cell">
                        Status</TableHead
                      >
                      <TableHead class="text-right"> Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <SheetTrigger as-child>
                      <TableRow
                        v-for="(report, index) in globalStore.allReports"
                        :key="index"
                        class="cursor-pointer"
                      >
                        <TableCell> ID 676-75-34{{ report.id }} </TableCell>
                        <TableCell class="hidden sm:table-cell">
                          {{ report.name }}
                        </TableCell>
                        <TableCell class="hidden sm:table-cell">
                          {{ report.date }}</TableCell
                        >
                        <TableCell class="hidden md:table-cell">
                          {{ report.images.length }}</TableCell
                        >
                        <TableCell class="hidden md:table-cell">
                          <Badge class="text-xs" variant="secondary">
                            Successful
                          </Badge>
                        </TableCell>
                        <TableCell class="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                              <Button
                                size="icon"
                                variant="outline"
                                class="h-8 w-8"
                                @click.stop
                              >
                                <MoreVertical class="h-3.5 w-3.5" />
                                <span class="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem class="cursor-pointer"
                                >Open</DropdownMenuItem
                              >
                              <DropdownMenuItem class="cursor-pointer"
                                ><NuxtLink
                                  @click="() => editReport(index)"
                                  to="/step1"
                                  >Edit</NuxtLink
                                ></DropdownMenuItem
                              >
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                class="cursor-pointer"
                                @click="() => deleteReport(index)"
                                >Delete</DropdownMenuItem
                              >
                            </DropdownMenuContent>
                          </DropdownMenu></TableCell
                        >
                      </TableRow></SheetTrigger
                    >
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <SheetContent class="dark p-0 bg-black border-[#27272A]">
        <div>
          <!-- <Card class="overflow-hidden border-none rounded-none">
            <CardHeader class="flex flex-row items-start bg-[#18181A]">
              <div class="grid gap-0.5">
                <CardTitle class="group flex items-center gap-2 text-lg">
                  Order ID: Oe31b70H
                  <Button
                    size="icon"
                    variant="outline"
                    class="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Copy class="h-3 w-3" />
                    <span class="sr-only">Copy Order ID</span>
                  </Button>
                </CardTitle>
                <CardDescription>Date: November 23, 2023</CardDescription>
              </div>
              <div class="ml-auto flex items-center gap-1">
                <Button size="sm" variant="outline" class="h-8 gap-1">
                  <Truck class="h-3.5 w-3.5" />
                  <span class="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                    Track Order
                  </span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button size="icon" variant="outline" class="h-8 w-8">
                      <MoreVertical class="h-3.5 w-3.5" />
                      <span class="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Export</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Trash</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent class="p-6 text-sm">
              <div class="grid gap-3">
                <div class="font-semibold">Order Details</div>
                <ul class="grid gap-3">
                  <li class="flex items-center justify-between">
                    <span class="text-muted-foreground">
                      Glimmer Lamps x <span>2</span>
                    </span>
                    <span>$250.00</span>
                  </li>
                  <li class="flex items-center justify-between">
                    <span class="text-muted-foreground">
                      Aqua Filters x <span>1</span>
                    </span>
                    <span>$49.00</span>
                  </li>
                </ul>
                <Separator class="my-2" />
                <ul class="grid gap-3">
                  <li class="flex items-center justify-between">
                    <span class="text-muted-foreground">Subtotal</span>
                    <span>$299.00</span>
                  </li>
                  <li class="flex items-center justify-between">
                    <span class="text-muted-foreground">Shipping</span>
                    <span>$5.00</span>
                  </li>
                  <li class="flex items-center justify-between">
                    <span class="text-muted-foreground">Tax</span>
                    <span>$25.00</span>
                  </li>
                  <li class="flex items-center justify-between font-semibold">
                    <span class="text-muted-foreground">Total</span>
                    <span>$329.00</span>
                  </li>
                </ul>
              </div>
              <Separator class="my-4" />
              <div class="grid grid-cols-2 gap-4">
                <div class="grid gap-3">
                  <div class="font-semibold">Shipping Information</div>
                  <address
                    class="grid gap-0.5 not-italic text-muted-foreground"
                  >
                    <span>Liam Johnson</span>
                    <span>1234 Main St.</span>
                    <span>Anytown, CA 12345</span>
                  </address>
                </div>
                <div class="grid auto-rows-max gap-3">
                  <div class="font-semibold">Billing Information</div>
                  <div class="text-muted-foreground">
                    Same as shipping address
                  </div>
                </div>
              </div>
              <Separator class="my-4" />
              <div class="grid gap-3">
                <div class="font-semibold">Customer Information</div>
                <dl class="grid gap-3">
                  <div class="flex items-center justify-between">
                    <dt class="text-muted-foreground">Customer</dt>
                    <dd>Liam Johnson</dd>
                  </div>
                  <div class="flex items-center justify-between">
                    <dt class="text-muted-foreground">Email</dt>
                    <dd>
                      <a href="mailto:">liam@acme.com</a>
                    </dd>
                  </div>
                  <div class="flex items-center justify-between">
                    <dt class="text-muted-foreground">Phone</dt>
                    <dd>
                      <a href="tel:">+1 234 567 890</a>
                    </dd>
                  </div>
                </dl>
              </div>
              <Separator class="my-4" />
              <div class="grid gap-3">
                <div class="font-semibold">Payment Information</div>
                <dl class="grid gap-3">
                  <div class="flex items-center justify-between">
                    <dt class="flex items-center gap-1 text-muted-foreground">
                      <CreditCard class="h-4 w-4" />
                      Visa
                    </dt>
                    <dd>**** **** **** 4532</dd>
                  </div>
                </dl>
              </div>
            </CardContent>
            <CardFooter
              class="flex flex-row items-center bg-[#18181A] px-6 py-3"
            >
              <div class="text-xs text-muted-foreground">
                Updated <time dateTime="2023-11-23">November 23, 2023</time>
              </div>
              <Pagination class="ml-auto mr-0 w-auto">
                <PaginationList class="gap-1">
                  <PaginationPrev variant="outline" class="h-6 w-6" />
                  <PaginationNext variant="outline" class="h-6 w-6" />
                </PaginationList>
              </Pagination>
            </CardFooter>
          </Card> -->
        </div>
      </SheetContent>
    </main>
  </Sheet>
</template>
