package requests;

import cbr.CBRAgent;
import utils.Transform;

public class RequestHandler {
	public static boolean addCase(String pattern, boolean solveable, String[] solutionCells, String[] solutionTypes) {
		System.out.print("Checking input...");
		if(
		RequestValidator.validatePattern(pattern) &&
		RequestValidator.validateSolution(solveable, solutionCells, solutionTypes)
		) {
			
			System.out.println(" Valid!");
			//TODO: renew initialize project
			CBRAgent.initializeCBR();
			try {
				System.out.print("Adding Case " + pattern + " to case base...");
				CBRAgent.addCase(Transform.apiInputToCase(pattern, solveable, solutionCells, solutionTypes));
				System.out.println(" Success!\n");
			} catch(Exception e) {
				System.out.println(" Failed!\n");
			}
			return true;
		}
		System.out.println(" Invalid!\n");
		return false;
	}
	
	public static boolean upadteCase(String pattern, boolean solveable, String[] solutionCells, String[] solutionTypes) {
		System.out.print("Checking input...");
		if(
		RequestValidator.validatePattern(pattern) &&
		RequestValidator.validateSolution(solveable, solutionCells, solutionTypes)
		) {
			System.out.println(" Valid!");
			//TODO: renew initialize project
			CBRAgent.initializeCBR();
			try {
				System.out.print("Updating Case " + pattern + " in the case base...");
				CBRAgent.removeCase(pattern);
				CBRAgent.addCase(Transform.apiInputToCase(pattern, solveable, solutionCells, solutionTypes));
				System.out.println(" Success!\n");
			} catch(Exception e) {
				//TODO: store old case if adding new one fails
				System.out.println(" Failed!\n");
			}
			return true;
		}
		System.out.println(" Invalid!\n");
		return false;
	}
	
	public static boolean removeCase(String pattern) {
		System.out.print("Checking input...");
		if(RequestValidator.validatePattern(pattern)) {
			System.out.println(" Valid!");
			//TODO: renew initialize project
			CBRAgent.initializeCBR();
			System.out.print("Removing Case " + pattern + " from the case base...");
			CBRAgent.removeCase(pattern);
			System.out.println("Success!\n");
			return true;
		}
		System.out.println(" Invalid!\n");
		return false;
	}
	
	public static String getSolution(String pattern) {
		System.out.print("Checking input...");
		if(RequestValidator.validatePattern(pattern)) {
			System.out.println(" Valid!");
			//TODO: renew initialize project
			CBRAgent.initializeCBR();
			return CBRAgent.caseQuery(pattern);
		}
		System.out.println(" Invalid!\n");
		return "";
	}
	
	public static void initializeBackend() {
		CBRAgent.initializeCBR();
	}
}
