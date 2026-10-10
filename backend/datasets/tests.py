from django.test import SimpleTestCase


class HelloEndpointTests(SimpleTestCase):
    def test_hello_returns_expected_message(self):
        response = self.client.get("/api/hello/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "Hello from Django"})