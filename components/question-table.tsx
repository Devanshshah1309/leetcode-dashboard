"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parse } from "csv-parse/sync";

const companies = [
  "AMD",
  "Accenture",
  "Accolite",
  "Adobe",
  "Affirm",
  "Agoda",
  "Airbnb",
  "Airtel",
  "Akamai",
  "Akuna Capital",
  "Alibaba",
  "Altimetrik",
  "Amazon",
  "Amdocs",
  "American Express",
  "Anduril",
  "Apple",
  "Arcesium",
  "Arista Networks",
  "Atlassian",
  "Attentive",
  "Autodesk",
  "Avito",
  "BNY Mellon",
  "BP",
  "Baidu",
  "Barclays",
  "BitGo",
  "BlackRock",
  "Blizzard",
  "Block",
  "Bloomberg",
  "Bolt",
  "Booking.com",
  "Box",
  "ByteDance",
  "CARS24",
  "Cadence",
  "Capgemini",
  "Capital One",
  "Cashfree",
  "Chewy",
  "Cisco",
  "Citadel",
  "Citrix",
  "Cloudera",
  "Cloudflare",
  "Cognizant",
  "Coinbase",
  "Commvault",
  "Confluent",
  "ConsultAdd",
  "Coupang",
  "Coursera",
  "CrowdStrike",
  "Cruise",
  "CureFit",
  "DE Shaw",
  "DP world",
  "DRW",
  "Darwinbox",
  "Databricks",
  "Datadog",
  "Deliveroo",
  "Dell",
  "Deloitte",
  "Deutsche Bank",
  "DevRev",
  "Directi",
  "Disney",
  "Docusign",
  "DoorDash",
  "Dream11",
  "Dropbox",
  "Dunzo",
  "EPAM Systems",
  "Epic Systems",
  "Expedia",
  "FactSet",
  "Flexport",
  "Flipkart",
  "FreshWorks",
  "GE Healthcare",
  "GSN Games",
  "Geico",
  "Gojek",
  "Goldman Sachs",
  "Google",
  "Grab",
  "Grammarly",
  "Graviton",
  "Groww",
  "HCL",
  "HPE",
  "HashedIn",
  "Huawei",
  "Hubspot",
  "Hudson River Trading",
  "Hulu",
  "IBM",
  "IMC",
  "IXL",
  "InMobi",
  "Indeed",
  "Infosys",
  "Instacart",
  "Intel",
  "Intuit",
  "J.P. Morgan",
  "Jane Street",
  "Jump Trading",
  "Juspay",
  "KLA",
  "Karat",
  "LinkedIn",
  "LiveRamp",
  "Lowe's",
  "Lucid",
  "Lyft",
  "MakeMyTrip",
  "Mastercard",
  "MathWorks",
  "Media.net",
  "Meesho",
  "Mercari",
  "Meta",
  "Microsoft",
  "Millennium",
  "Mitsogo",
  "Moloco",
  "MongoDB",
  "Morgan Stanley",
  "Moveworks",
  "Myntra",
  "Nagarro",
  "NetApp",
  "Netflix",
  "Nextdoor",
  "Niantic",
  "Nielsen",
  "Nike",
  "Nordstrom",
  "Nutanix",
  "Nvidia",
  "OKX",
  "Okta",
  "OpenAI",
  "Oracle",
  "Otter.ai",
  "Ozon",
  "Palantir Technologies",
  "Palo Alto Networks",
  "PayPal",
  "Paytm",
  "PhonePe",
  "Pinterest",
  "Pocket Gems",
  "Point72",
  "PornHub",
  "Pure Storage",
  "Qualcomm",
  "Quora",
  "RBC",
  "Rakuten",
  "Reddit",
  "Revolut",
  "Ripple",
  "Rippling",
  "Robinhood",
  "Roblox",
  "Roku",
  "Rubrik",
  "SAP",
  "SIG",
  "Salesforce",
  "Samsara",
  "Samsung",
  "ServiceNow",
  "Shopee",
  "Shopify",
  "Siemens",
  "Sigmoid",
  "Snap",
  "Snowflake",
  "SoFi",
  "Splunk",
  "Spotify",
  "Sprinklr",
  "Squarepoint Capital",
  "Stripe",
  "Swiggy",
  "Tekion",
  "Tencent",
  "Tesla",
  "ThoughtWorks",
  "TikTok",
  "Tinkoff",
  "Trilogy",
  "Turing",
  "Turo",
  "Twilio",
  "Twitch",
  "Two Sigma",
  "UKG",
  "Uber",
  "UiPath",
  "VK",
  "VMware",
  "Veeva Systems",
  "Verily",
  "Verkada",
  "Virtu Financial",
  "Visa",
  "Walmart Labs",
  "Warnermedia",
  "Wayfair",
  "Wells Fargo",
  "Wipro",
  "Wix",
  "Workday",
  "X",
  "Yahoo",
  "Yandex",
  "Yelp",
  "ZS Associates",
  "ZScaler",
  "Zalando",
  "Zenefits",
  "Zepto",
  "Zeta",
  "Zillow",
  "Zoho",
  "Zomato",
  "Zopsmart",
  "athenahealth",
  "carwale",
  "eBay",
  "jio",
  "josh technology",
  "opentext",
  "oyo",
  "persistent systems",
  "razorpay",
  "tcs",
  "thoughtspot",
];

interface Question {
  id: string;
  title: string;
  topics: string[];
  difficulty: string;
  frequency: number;
  link: string;
}

export default function QuestionTable() {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [duration, setDuration] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCompany && duration) {
      setLoading(true);
      setError(null);
      fetch(
        `/leetcode-company-wise-problems/${selectedCompany}/${duration}.csv`
      )
        .then((response) => response.text())
        .then((csvString) => {
          const parsedData = parse(csvString, {
            columns: true,
            skip_empty_lines: true,
          });
          const formattedData = parsedData.map((row: any, index: number) => ({
            id: (index + 1).toString(),
            title: row.Title,
            difficulty:
              row.Difficulty[0] + row.Difficulty.slice(1).toLowerCase(),
            link: row.Link,
            frequency: row.Frequency,
            topics: row.Topics.split(",").map((t: string) => t.trim()),
          }));
          setQuestions(formattedData);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading CSV:", err);
          setError("Failed to load data. Please try again.");
          setLoading(false);
        });
    }
  }, [selectedCompany, duration]);

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 text-black">
        <div className="w-full md:w-auto">
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-auto">
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1. Thirty Days">Past 30 days</SelectItem>
              <SelectItem value="2. Three Months">Past 3 months</SelectItem>
              <SelectItem value="3. Six Months">Past 6 months</SelectItem>
              <SelectItem value="5. All">Forever</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Id</TableHead>
              <TableHead className="text-white">Question</TableHead>
              <TableHead className="text-white">Difficulty</TableHead>
              <TableHead className="text-white">Frequency</TableHead>
              <TableHead className="text-white">Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((q) => (
              <TableRow key={q.id}>
                <TableCell>{q.id}</TableCell>
                <TableCell>
                  <a href={q.link} className="text-sky-500">
                    {q.title}
                  </a>
                </TableCell>
                <TableCell
                  className={
                    q.difficulty === "Easy"
                      ? "text-teal-400"
                      : q.difficulty === "Medium"
                      ? "text-amber-400"
                      : "text-red-500"
                  }
                >
                  {q.difficulty}
                </TableCell>
                <TableCell>{q.frequency}</TableCell>
                <TableCell>{q.topics.join(", ")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {!loading &&
        duration !== "" &&
        selectedCompany !== "" &&
        questions.length === 0 && (
          <p className="p-4 text-sm">No questions found!</p>
        )}
    </div>
  );
}
