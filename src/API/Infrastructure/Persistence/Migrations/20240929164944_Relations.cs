using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineJudge.API.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Relations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Problems_Contest_ContestId",
                table: "Problems");

            migrationBuilder.DropForeignKey(
                name: "FK_Submission_AspNetUsers_SubmitterId",
                table: "Submission");

            migrationBuilder.DropForeignKey(
                name: "FK_Submission_Contest_ContestId",
                table: "Submission");

            migrationBuilder.DropForeignKey(
                name: "FK_Submission_Problems_ProblemId",
                table: "Submission");

            migrationBuilder.DropIndex(
                name: "IX_Problems_ContestId",
                table: "Problems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Submission",
                table: "Submission");

            migrationBuilder.DropColumn(
                name: "ContestId",
                table: "Problems");

            migrationBuilder.RenameTable(
                name: "Submission",
                newName: "Submissions");

            migrationBuilder.RenameIndex(
                name: "IX_Submission_SubmitterId",
                table: "Submissions",
                newName: "IX_Submissions_SubmitterId");

            migrationBuilder.RenameIndex(
                name: "IX_Submission_ProblemId",
                table: "Submissions",
                newName: "IX_Submissions_ProblemId");

            migrationBuilder.RenameIndex(
                name: "IX_Submission_ContestId",
                table: "Submissions",
                newName: "IX_Submissions_ContestId");

            migrationBuilder.AlterColumn<string>(
                name: "TestCases",
                table: "Problems",
                type: "jsonb",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "jsonb");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Submissions",
                table: "Submissions",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "ContestProblem",
                columns: table => new
                {
                    ContestId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProblemsId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContestProblem", x => new { x.ContestId, x.ProblemsId });
                    table.ForeignKey(
                        name: "FK_ContestProblem_Contest_ContestId",
                        column: x => x.ContestId,
                        principalTable: "Contest",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ContestProblem_Problems_ProblemsId",
                        column: x => x.ProblemsId,
                        principalTable: "Problems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContestProblem_ProblemsId",
                table: "ContestProblem",
                column: "ProblemsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Submissions_AspNetUsers_SubmitterId",
                table: "Submissions",
                column: "SubmitterId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Submissions_Contest_ContestId",
                table: "Submissions",
                column: "ContestId",
                principalTable: "Contest",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Submissions_Problems_ProblemId",
                table: "Submissions",
                column: "ProblemId",
                principalTable: "Problems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Submissions_AspNetUsers_SubmitterId",
                table: "Submissions");

            migrationBuilder.DropForeignKey(
                name: "FK_Submissions_Contest_ContestId",
                table: "Submissions");

            migrationBuilder.DropForeignKey(
                name: "FK_Submissions_Problems_ProblemId",
                table: "Submissions");

            migrationBuilder.DropTable(
                name: "ContestProblem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Submissions",
                table: "Submissions");

            migrationBuilder.RenameTable(
                name: "Submissions",
                newName: "Submission");

            migrationBuilder.RenameIndex(
                name: "IX_Submissions_SubmitterId",
                table: "Submission",
                newName: "IX_Submission_SubmitterId");

            migrationBuilder.RenameIndex(
                name: "IX_Submissions_ProblemId",
                table: "Submission",
                newName: "IX_Submission_ProblemId");

            migrationBuilder.RenameIndex(
                name: "IX_Submissions_ContestId",
                table: "Submission",
                newName: "IX_Submission_ContestId");

            migrationBuilder.AlterColumn<string>(
                name: "TestCases",
                table: "Problems",
                type: "jsonb",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "jsonb",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ContestId",
                table: "Problems",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Submission",
                table: "Submission",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Problems_ContestId",
                table: "Problems",
                column: "ContestId");

            migrationBuilder.AddForeignKey(
                name: "FK_Problems_Contest_ContestId",
                table: "Problems",
                column: "ContestId",
                principalTable: "Contest",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Submission_AspNetUsers_SubmitterId",
                table: "Submission",
                column: "SubmitterId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Submission_Contest_ContestId",
                table: "Submission",
                column: "ContestId",
                principalTable: "Contest",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Submission_Problems_ProblemId",
                table: "Submission",
                column: "ProblemId",
                principalTable: "Problems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
