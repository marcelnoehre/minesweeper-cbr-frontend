package Servlets;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import requests.RequestHandler;

/**
 * Servlet implementation class solution
 */
@WebServlet("/getSolution")
public class getSolution extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public getSolution() {
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append("Minesweeper CBR Backend running at Port 8080");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request instanceof HttpServletRequest) {
			String result = RequestHandler.getSolution(request.getParameter("pattern"));
			if(result.length() == 0) {
				response.sendError(400, "Bad Request");
			} else {
				response.getOutputStream().println(result);
			}
		}
	}

}
