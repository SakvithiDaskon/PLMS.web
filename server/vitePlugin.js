import { createRequire } from 'module';
import url from 'url';

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

export function aivenVitePlugin() {
  return {
    name: 'aiven-api-plugin',
    configureServer(server) {
      const require = createRequire(import.meta.url);
      const { aivenApi } = require('./aiven_api.cjs');

      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api')) {
          return next();
        }

        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const method = req.method;

        try {
          // 1. Student Registration
          if (pathname === '/api/register' && method === 'POST') {
            const body = await parseBody(req);
            const result = await aivenApi.registerStudent(body);
            return sendJson(res, 200, result);
          }

          // 2. Authentication Login
          if (pathname === '/api/login' && method === 'POST') {
            const body = await parseBody(req);
            const result = await aivenApi.login(body);
            return sendJson(res, 200, result);
          }

          // 3. Get Student by ID
          if (pathname.startsWith('/api/student/') && method === 'GET') {
            const id = pathname.replace('/api/student/', '');
            const student = await aivenApi.getStudentById(id);
            return sendJson(res, 200, { success: Boolean(student), student });
          }

          // 4. Update Student Profile
          if (pathname.startsWith('/api/student/') && method === 'PUT') {
            const id = pathname.replace('/api/student/', '');
            const body = await parseBody(req);
            const result = await aivenApi.updateStudentProfile(id, body);
            return sendJson(res, 200, result);
          }

          // 5. Mathematics Topics
          if (pathname === '/api/topics' && method === 'GET') {
            const grade = parsedUrl.query.grade || '';
            const topics = await aivenApi.getMathematicsTopics(grade);
            return sendJson(res, 200, { success: true, topics });
          }

          // 6. Scheduled Classes
          if (pathname === '/api/classes' && method === 'GET') {
            const grade = parsedUrl.query.grade || '';
            const classes = await aivenApi.getStudentClasses(null, grade);
            return sendJson(res, 200, { success: true, classes });
          }

          // 7. Admin: All Students
          if (pathname === '/api/students' && method === 'GET') {
            const students = await aivenApi.getAllStudents();
            return sendJson(res, 200, { success: true, students });
          }

          // 8. Admin: All Parents
          if (pathname === '/api/parents' && method === 'GET') {
            const parents = await aivenApi.getAllParents();
            return sendJson(res, 200, { success: true, parents });
          }

          // 9. Zoom Links Management
          if (pathname === '/api/zoom' && method === 'GET') {
            const links = await aivenApi.getZoomLinks();
            return sendJson(res, 200, { success: true, links });
          }
          if (pathname === '/api/zoom' && method === 'POST') {
            const body = await parseBody(req);
            const result = await aivenApi.createZoomLink(body);
            return sendJson(res, 200, result);
          }
          if (pathname.startsWith('/api/zoom/') && method === 'DELETE') {
            const id = pathname.replace('/api/zoom/', '');
            const result = await aivenApi.deleteZoomLink(id);
            return sendJson(res, 200, result);
          }

          // Health Check
          if (pathname === '/api/health') {
            const health = await aivenApi.checkHealth();
            return sendJson(res, 200, health);
          }

          next();
        } catch (err) {
          console.error('Aiven API Error:', err);
          sendJson(res, 500, { success: false, message: err.message });
        }
      });
    }
  };
}
