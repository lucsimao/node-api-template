describe('SignIn Tests', () => {
  describe('POST Method', () => {
    it('should return 404 when call a invalid route', async () => {
      const response = await global.testRequest.get('/invalid').send();

      expect(response.body).toEqual({
        message: 'Not found',
      });

      expect(response.status).toBe(404);
    });
  });
});
