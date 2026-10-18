#!/usr/bin/env node
"use strict";

var http = require("http");
var fs = require("fs");
var path = require("path");
var url = require("url");

var ROOT = __dirname;
var PORT = Number(process.env.PORT) || 3000;

var MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

function send(res, status, body, headers) {
  var finalHeaders = Object.assign(
    {
      "Cache-Control": "no-store",
    },
    headers || {}
  );
  res.writeHead(status, finalHeaders);
  res.end(body);
}

function sendFile(res, filePath) {
  fs.readFile(filePath, function (err, data) {
    if (err) {
      if (err.code === "ENOENT") {
        send(res, 404, "Not Found", { "Content-Type": "text/plain; charset=utf-8" });
        return;
      }
      send(res, 500, "Internal Server Error", {
        "Content-Type": "text/plain; charset=utf-8",
      });
      return;
    }
    var ext = path.extname(filePath).toLowerCase();
    send(res, 200, data, {
      "Content-Type": MIME[ext] || "application/octet-stream",
    });
  });
}

function safeJoin(root, requestPath) {
  var decoded = decodeURIComponent(requestPath);
  var joined = path.normalize(path.join(root, decoded));
  if (!joined.startsWith(root)) {
    return null;
  }
  return joined;
}

function handleApiPeople(req, res, slug) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    send(res, 405, "Method Not Allowed", {
      "Content-Type": "text/plain; charset=utf-8",
      Allow: "GET, HEAD",
    });
    return;
  }

  if (!slug || slug.includes("..") || slug.includes("/") || slug.includes("\\")) {
    send(res, 404, JSON.stringify({ error: "not_found" }), {
      "Content-Type": "application/json; charset=utf-8",
    });
    return;
  }

  var filePath = path.join(ROOT, "api", "people", slug + ".json");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      send(res, 404, JSON.stringify({ error: "not_found" }), {
        "Content-Type": "application/json; charset=utf-8",
      });
      return;
    }
    send(res, 200, data, {
      "Content-Type": "application/json; charset=utf-8",
    });
  });
}

function handleStatic(req, res, pathname) {
  var relative = pathname === "/" ? "/index.html" : pathname;
  var filePath = safeJoin(ROOT, relative);
  if (!filePath) {
    send(res, 400, "Bad Request", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }

  fs.stat(filePath, function (err, stats) {
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
    sendFile(res, filePath);
  });
}

var server = http.createServer(function (req, res) {
  var parsed = url.parse(req.url);
  var pathname = parsed.pathname || "/";

  var apiMatch = pathname.match(/^\/api\/people\/([^/]+)\/?$/);
  if (apiMatch) {
    handleApiPeople(req, res, decodeURIComponent(apiMatch[1]));
    return;
  }

  // Rewrite /p/<slug> to the person page shell (same origin as API).
  if (/^\/p\/[^/]+\/?$/.test(pathname)) {
    sendFile(res, path.join(ROOT, "p", "index.html"));
    return;
  }

  handleStatic(req, res, pathname);
});

server.listen(PORT, function () {
  console.log("Fatos e Evidências em http://localhost:" + PORT);
  console.log("Exemplos: /p/pessoa-a  /p/pessoa-b  /api/people/pessoa-a");
});
